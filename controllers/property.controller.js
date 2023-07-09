const BaseController = require('./base.controller');
const PropertyRepository = require('../repository/property.repository');
const multer = require('multer');
const CommentRepository = require('../repository/comment.repository');

// Create a multer storage configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  },
});

// Create a multer upload instance
const upload = multer({
  storage: storage,
});

class PropertyController extends BaseController {
  constructor() {
    const propertyRepository = new PropertyRepository();
    const commentRepository = new CommentRepository();
    super(propertyRepository);
    this.repo = propertyRepository;
    this.comment = commentRepository;
  }

  async add(req, res) {
    try {
      upload.fields([
        { name: 'photos', maxCount: 1 },
        { name: 'maps', maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          return res.status(500).send('Failed to upload photo.');
        }

        const {
          property_name,
          property_type,
          location,
          description,
          bedrooms,
          bathrooms,
          cost,
        } = req.body;

        const propertyData = {
          property_name,
          property_type,
          location,
          description,
          bedrooms,
          bathrooms,
          cost,
        };

        if (req.files) {
          propertyData.photos = req.files['photos'][0].filename;
          propertyData.maps = req.files['maps'][0].filename;
        }

        const property = await this.repo.create(propertyData);

        res.redirect('/landlord');
      });
    } catch (err) {
      this.sendErrorResponse(res, 'Failed to add property');
    }
  }

  // Implement other controller methods as needed
  async getAllProperty(req, res) {
    try {
      const properties = await this.repo.findAll();
      res.render('propertyview',{properties});
    } catch (err) {
      throw new Error('Failed to retrieve property data');
    }
  }

   
  async getUnapprovedProperties() {
    try {
      const properties = await this.repo.findAll({ approved: false });
      return properties;
    } catch (err) {
      throw new Error('Failed to retrieve unapproved properties');
    }
  }

   
  async getapprovedProperties() {
    try {
      const properties = await this.repo.findAll({ approved: true });
      return properties;
    } catch (err) {
      throw new Error('Failed to retrieve unapproved properties');
    }
  }
  async getAllProperties() {
    try {
      const properties = await this.repo.findAll({ approved: true });
  
      // Calculate the likes for each property
      for (const property of properties) {
        property.likes = property.comments.reduce((totalLikes, comment) => totalLikes + comment.likes, 0);
      }
  
      return properties;
    } catch (err) {
      throw new Error('Failed to retrieve property data');
    }
  }
  

/*
  async getAllProperties() {
    try {
      const properties = await this.repo.findAll({ approved: true }).populate('comments');

      for (const property of properties) {
        property.likes = property.comments.reduce((totalLikes, comment) => totalLikes + comment.likes, 0);
        await property.save();
      }

      return properties;
    } catch (err) {
      throw new Error('Failed to retrieve property data');
    }
  }
*/
  // ...

  async approveProperty(_id) {
    try {
      const property = await this.repo.findById(_id);

      if (!property) {
        throw new Error('Property not found');
      }

      property.approved = true;
      await property.save();
    } catch (error) {
      throw new Error('Failed to approve property');
    }
  }

  async disapproveProperty(_id) {
    try {
      const property = await this.repo.findById(_id);

      if (!property) {
        throw new Error('Property not found');
      }

      property.approved = false;
      await property.save();
    } catch (error) {
      throw new Error('Failed to disapprove property');
    }
  }

  async deleteById(_id) {
    try {           
      const property = await this.repo.deleteById(_id);
      if (!property) {
        throw new Error('Property not found');
      }
     
    } catch (err) {
      throw new Error('Failed to delete property');
    }
  }











}

module.exports = PropertyController;
