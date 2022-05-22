const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags and its associated product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'tag_products'}],
    });
    res.status(200).json(tagData);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }

});

router.get('/:id', async (req, res) => {
  // Find a single tag by its `id` and its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'tag_products'}],
    });
    res.status(200).json(tagData);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post('/', async(req, res) => {
  // Route to create a new tag
  try{
    if (req.body) {
      const newTag = await Tag.create(req.body);
      const createMessage = {
        message: 'Successfully Created the Tag',
        data: newTag.id
      }
      res.status(200).json(createMessage);
      return;
    }
    else 
    {
      res.status(400).json(err);
      return;
    }
    } catch (err) {
      res.status(500).json(err);
      return;
    };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    if (req.body && req.params.id) {
      const updatedTag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      if (updatedTag) {
        const tagData = await Tag.findByPk(req.params.id, {
          include: [{model: Product, through: ProductTag, as: 'tag_products'}],
        });
        const putMessage = {
          message: 'Successfully updated the Tag',
          data: tagData
        }
        res.status(200).json(putMessage);
        return;
      }
    }
    else 
    {
      res.status(400).json(err);
      return;
    }
    } catch (err) {
      res.status(500).json(err);
      return;
    };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    if (req.params.id) {

      const tagData = await Tag.findByPk(req.params.id, {
        include: [{model: Product, through: ProductTag, as: 'tag_products'}],
      });

      const deletedData = await Tag.destroy({ where: { id: req.params.id} })
      
      if (deletedData) {
        const delMessage = {
          message : 'Successfully Deleted',
          data: tagData
        }
        res.status(200).json(delMessage);
        return;
      } else 
      {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
    } 
    else {
      res.status(400).json(err);
      return;
    }
  } catch (err){
      res.status(500).json(err);
      return;
  }
});

module.exports = router;
