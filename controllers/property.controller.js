const BaseController = require('./base.controller');
const PropertyRepository = require('../repository/property.repository');
const multer = require('multer');

const Property = require('../models/property.models');

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
    super(propertyRepository);
    this.repo = propertyRepository;
  }

  async  add(req, res) {
    try {
      upload.fields([
        { name: 'photos', maxCount: 1 },
        { name: 'maps', maxCount: 1 },
      ])(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading
          return res.status(500).send('Failed to upload photo.');
        } else if (err) {
          // An unknown error occurred when uploading
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

        const propertyData = new Property({
          property_name,
          property_type,
          location,
          description,
          bedrooms,
          bathrooms,
          cost,
        });

        if (req.files) {
          // Save the uploaded file names as the photo and maps properties
          console.log('files uploaded');
          console.log(req.files);
          propertyData.photos = req.files['photos'][0].filename;
          propertyData.maps = req.files['maps'][0].filename;
        }

        await propertyData.save();
        res.status(201).send(`
          <script>
            alert('Property saved successfully');
            window.location.href = '/api/property/register';
          </script>
        `);
      });
    } catch (err) {
      this.sendErrorResponse(res, 'Failed to add property');
    }
  }

  // Implement other controller methods as needed

  async getAllProperties(req, res) {
    try {
      const properties = await this.repo.findAll();
      res.render('propertyview', { properties });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to retrieve data' });
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


 
}





module.exports = PropertyController;
