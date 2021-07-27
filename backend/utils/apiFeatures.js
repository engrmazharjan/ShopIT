class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search Products by Keyword
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter Products
  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy);

    // Removing Fields From The Query
    const removeFields = ["keyword", "limit", "page"];

    removeFields.forEach((ele) => delete queryCopy[ele]);

    // console.log(queryCopy);

    // Advance Filter For Price Rating etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // console.log(queryStr);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
}

module.exports = APIFeatures;
