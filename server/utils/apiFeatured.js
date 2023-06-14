class ApiFeatured {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    paginate = () => {
        const page = this.queryStr.page ?? 1;
        const limit = 20;
        const offset = (page - 1) * 20;
        this.query.find().limit(limit).skip(offset);
        return this;
    };

    sort = () => {
        let sort = this.queryStr.sort;
        if (sort) {
            sort = sort.split(",").join(" ");
            this.query.sort(sort);
        } else {
            this.query.sort("createdAt");
        }
        return this;
    };

    filter = () => {
        const exceptFields = ["sort", "limit", "page", "fields", "q"];
        let fields = { ...this.queryStr };
        exceptFields.forEach((val) => delete fields[val]);
        fields = JSON.stringify(fields);
        fields = fields.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        this.query.find(JSON.parse(fields));
        return this;
    };

    search = () => {
        const q = this.queryStr.q;
        if (q) this.query.find({ $text: { $search: q } });
        return this;
    };
}
