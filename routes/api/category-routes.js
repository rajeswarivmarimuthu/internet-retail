const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories and its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryData);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value and its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post('/', async (req, res) => {
  // route to create a new category
  try{
  if (req.body) {
    const newCategory = await Category.create(req.body);
    const createMessage = {
      message: 'Successfully created the category',
      data: newCategory.id
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
  // update a category by its `id` value
  try{

    if (req.body && req.params.id) {
      const updatedCategory = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      })

      const putMessage = {
        message: 'successfully updated the category',
        data: updatedCategory.id
      }

      res.status(200).json(putMessage);
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

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    if (req.params.id) {

      const categoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product}],
      });

      const deletedData = await Category.destroy({ where: { id: req.params.id} })

      if (deletedData) {
        const delMessage = {
          message: 'Deleted Successfully',
          data: categoryData
        }
        res.status(200).json(delMessage);
        return;
      } else 
      {
        res.status(404).json({ message: 'No location found with this id!' });
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
