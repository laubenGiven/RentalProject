class BaseRepository {
    constructor(_collection) {
      this._collection = _collection;
    }
  
    findAll() {
      return this._collection.find().lean().exec();
    }
  
    findById(id) {
      return this._collection.findById(id);
    }
  
    create(model) {
      return this._collection.create(model);
    }
  
    update(model) {
      return this._collection.findByIdAndUpdate(model._id, model);
    }
  
    deleteById(id) {
      return this._collection.findByIdAndDelete(id);
    }
  }
  
  module.exports = BaseRepository;
  