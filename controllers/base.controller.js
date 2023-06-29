class BaseController {
    constructor(repository) {
      this.repo = repository;
      this.getAll = this.getAll.bind(this);
      this.getById = this.getById.bind(this);
      this.add = this.add.bind(this);
      this.update = this.update.bind(this);
      this.deleteById = this.deleteById.bind(this);
    }
  
    async getAll(req, res) {
      try {
        const docs = await this.repo.findAll();
        this.sendSuccessResponse(res, 'Successfully retrieved data', docs);
      } catch (err) {
        this.sendErrorResponse(res, 'Failed to retrieve data');
      }
    }
  
    async getById(req, res) {
      try {
        const id = req.params.id;
        const doc = await this.repo.findById(id);
        if (doc) {
          this.sendSuccessResponse(res, 'Successfully retrieved data', doc);
        } else {
          this.sendErrorResponse(res, 'Data not found', 404);
        }
      } catch (err) {
        this.sendErrorResponse(res, 'Failed to retrieve data');
      }
    }
  
    async add(req, res) {
      try {
        const body = req.body;
        const doc = await this.repo.create(body); // Create a new document using the repo's create method
        this.sendSuccessResponse(res, 'Successfully created data', doc, 201);
      } catch (err) {
        this.sendErrorResponse(res, 'Failed to add data/record');
      }
    }
    async update(req, res) {
        try {
          const id = req.params.id;
          const updatedData = req.body;
      
          const doc = await this.repo.findById(id);
      
          if (!doc) {
            return this.sendErrorResponse(res, 'Data not found', 404);
          }
      
          Object.assign(doc, updatedData);
      
          const updatedDoc = await doc.save();
      
          this.sendSuccessResponse(res, 'Data updated successfully', updatedDoc);
        } catch (err) {
          this.sendErrorResponse(res, 'Failed to update data');
        }
      }
  
    async deleteById(req, res) {
      try {
        const id = req.params.id;
        const deletedDoc = await this.repo.deleteById(id);
        if (deletedDoc) {
          this.sendSuccessResponse(res, 'Successfully deleted data', deletedDoc);
        } else {
          this.sendErrorResponse(res, 'Data not found', 404);
        }
      } catch (err) {
        this.sendErrorResponse(res, 'Internal Server Error');
      }
    }
  
    // Utility method to send a success response
    sendSuccessResponse(res, message, data, statusCode = 200) {
      res.status(statusCode).json({ success: true, message, data });
    }
  
    // Utility method to send an error response
    sendErrorResponse(res, message, statusCode = 500) {
      res.status(statusCode).json({ success: false, message });
    }
  }
  
  module.exports = BaseController;
  /*
  class BaseController {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(req, res) {
    try {
      const data = await this.repository.getAll();
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error(err);
      this.sendErrorResponse(res, 'Failed to fetch data');
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await this.repository.getById(id);
      if (data) {
        res.status(200).json({ success: true, data });
      } else {
        res.status(404).json({ success: false, message: 'Data not found' });
      }
    } catch (err) {
      console.error(err);
      this.sendErrorResponse(res, 'Failed to fetch data');
    }
  }

  async create(req, res) {
    try {
      const data = req.body;
      const doc = await this.repository.create(data);
      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      console.error(err);
      this.sendErrorResponse(res, 'Failed to create data');
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const doc = await this.repository.update(id, data);
      if (doc) {
        res.status(200).json({ success: true, data: doc });
      } else {
        res.status(404).json({ success: false, message: 'Data not found' });
      }
    } catch (err) {
      console.error(err);
      this.sendErrorResponse(res, 'Failed to update data');
    }
  }

  async deleteById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.repository.deleteById(id);
      if (result) {
        res.status(200).json({ success: true, message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Data not found' });
      }
    } catch (err) {
      console.error(err);
      this.sendErrorResponse(res, 'Failed to delete data');
    }
  }

  sendErrorResponse(res, message) {
    res.status(500).json({ success: false, message });
  }
}

module.exports = BaseController;

  */