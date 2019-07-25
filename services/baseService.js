export class BaseService {

	constructor(entity) {
		this.entity = entity;
	}

	async findById(id) {
		return await this.entity.findById(id);
	};

	async findAll() {
		return await this.entity.find({});
	};

	async findOneByQuery(query) {
		return await this.entity.findOne(query);
	};

	async findByQuery(query) {
		return await this.entity.find(query);
	};

	async save(document) {
		return await document.save();
	};

	async update(document) {
		return await this.entity.replaceOne({ _id: document._id }, document, { upsert: true });
	};

	async delete(document) {
		return await document.delete();
	};
}