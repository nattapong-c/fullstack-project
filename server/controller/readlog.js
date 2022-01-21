const { isValidDate } = require("../shared/utils/date");

const saveCover = async (req) => {
    let { name, data, mimetype } = req.files.cover;
    let newCover = await req.db.Cover({ name, buffer: data, mimetype }).save();
    return newCover;
};

const getCover = async (req, id) => {
    let cover = await req.db.Cover.findOne({ _id: id });
    return cover ? cover : null;
};

module.exports.createReadlog = async (req, res) => {
    let { book_name, start_date, end_date, author } = req.body;

    if (!book_name) return res.status(400).send({ error: "missing book_name" });
    if (!start_date) return res.status(400).send({ error: "missing start_date" });
    if (!isValidDate(start_date)) return res.status(400).send({ error: "invalid start_date" });
    if (end_date && !isValidDate(end_date)) return res.status(400).send({ error: "invalid end_date" });
    if (!author) return res.status(400).send({ error: "missing author" });

    let data = {
        book_name,
        start_date: new Date(start_date),
        author
    };
    if (end_date) data["end_date"] = new Date(end_date);
    let cover, coverData;
    if (req.files && req.files.cover) {
        cover = await saveCover(req);
        coverData = { mimetype: cover.mimetype, img: Buffer.from(cover.buffer).toString("base64") };
        data["cover"] = cover._id;
    }

    let log = await req.db.ReadLog(data);
    let logSaved = await log.save();
    return res.send({
        data: { ...logSaved._doc, cover: coverData }
    });
};

module.exports.updateReadlog = async (req, res) => {
    let { id } = req.params;
    let { book_name, start_date, end_date, author } = req.body;

    if (start_date && !isValidDate(start_date)) return res.status(400).send({ error: "invalid start_date" });
    if (end_date && !isValidDate(end_date)) return res.status(400).send({ error: "invalid end_date" });

    let log = await req.db.ReadLog.findOne({ _id: id });
    if (!log) return res.status(400).send({ error: "read log not found" });

    let update = {};
    if (book_name) update["book_name"] = book_name;
    if (start_date) update["start_date"] = new Date(start_date);
    if (end_date) update["end_date"] = new Date(end_date);
    if (author) update["author"] = author;
    let cover, coverData;
    if (req.files && req.files.cover) {
        cover = await saveCover(req);
        update["cover"] = cover._id;
    } else {
        cover = await getCover(req, log.cover);
    }

    if (cover) coverData = { mimetype: cover.mimetype, img: Buffer.from(cover.buffer).toString("base64") };

    log = await req.db.ReadLog.findOneAndUpdate(
        { _id: id },
        { $set: update },
        { new: true }
    );

    return res.send({
        data: { ...log._doc, cover: coverData }
    });
};

module.exports.deleteReadlog = async (req, res) => {
    let { id } = req.params;
    let log = await req.db.ReadLog.findOne({ _id: id });
    if (!log) return res.status(400).send({ error: "read log not found" });

    await req.db.ReadLog.deleteOne(log);
    return res.send({ data: log });
};

module.exports.getReadlogs = async (req, res) => {
    let { page, size } = req.query;
    if (!page) return res.status(400).send({ error: "missing page" });
    page = page - 1;
    if (!size) return res.status(400).send({ error: "missing size" });
    if (Number.isNaN(page) || page < 0) return res.status(400).send({ error: "page must be positive number" });
    if (Number.isNaN(size) || size <= 0) return res.status(400).send({ error: "size must be positive number" });

    let logsData = await req.db.ReadLog.aggregate([
        { $match: {} },
        {
            $lookup: {
                from: "cover",
                localField: "cover",
                foreignField: "_id",
                as: "cover"
            }
        },
        {
            $facet: {
                logs: [
                    { $match: {} },
                    { $sort: { created_date: -1 } },
                    { $skip: Number.parseInt(page) * Number.parseInt(size) },
                    { $limit: Number.parseInt(size) }
                ],
                total_item: [
                    {
                        $group: {
                            _id: null,
                            count: { $sum: 1 }
                        }
                    }
                ]
            }
        }
    ]);

    let totalItem = logsData[0].logs.length === 0 ? 0 : logsData[0].total_item[0].count;
    let totalPage = Math.ceil(totalItem / Number.parseInt(size));
    return res.send({
        data: {
            logs: logsData[0].logs,
            total_item: totalItem,
            total_page: totalPage
        }
    });
};

module.exports.getReadlog = async (req, res) => {
    let { id } = req.params;
    let log = await req.db.ReadLog.findOne({ _id: id });
    if (!log) return res.status(400).send({ error: "read log not found" });
    let cover = await req.db.Cover.findOne({ _id: log.cover });
    let coverData;
    if (cover) coverData = { mimetype: cover.mimetype, img: Buffer.from(cover.buffer).toString("base64") };
    return res.send({
        data: { ...log._doc, cover: coverData }
    });
};