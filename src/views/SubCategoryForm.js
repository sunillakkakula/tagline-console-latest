import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, TextField, Select, MenuItem } from '@material-ui/core';
import validate from 'validate.js';
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryAction";
import GridItem from "./Grid/GridItem.js";
import GridContainer from "./Grid/GridContainer.js";
import Card from "./Card/Card.js";
import CardHeader from "./Card/CardHeader.js";
import CardBody from "./Card/CardBody.js";
import { createSubCategoryByCategory } from "../actions/subCategoryAction";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 300,
    },
  },
};

const SubCategoryForm = ({ location, history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(() => "");
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  React.useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  let cats = categories ? categories.categories : [];


  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const {success, subcategory } = subCategoryCreate;

  let renderCategoriesOptions=""
  if (cats && cats.length > 0) {
    renderCategoriesOptions = cats.map((eachCategory, idx) => {
      return (
        <MenuItem key={idx} value={eachCategory._id}>
          {eachCategory.name}
        </MenuItem>
      );
    });
  }

  if (success) {
    console.log("Success Response to redirecting to Sub Category List");
    history.push("/admin/subcategory");
  }

  const handleChangeCategory = (e) => {
    console.log("Category Changed  " + e.target.value);
    setSelectedCategoryId(() => e.target.value);
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (formState.isValid) {
      console.log(formState.values,selectedCategoryId)
      dispatch(createSubCategoryByCategory(formState.values.name, formState.values.description, selectedCategoryId));
    }

    setFormState(formState => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>

<GridContainer spacing={2} alignItems="center" justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> Sub Category </h4>
            </CardHeader>
            <CardBody>
              <form name="password-reset-form" method="post" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <Select
                      value={selectedCategoryId}
                      onChange={handleChangeCategory}
                      placeholder="Category"
                      style={{ width: "10rem" }}
                    >
                      {renderCategoriesOptions}
                    </Select>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Name"
                      label="Name*"
                      variant="outlined"
                      size="medium"
                      name="name"
                      fullWidth
                      helperText={hasError('name') ? formState.errors.name[0] : null}
                      error={hasError('name')}
                      onChange={handleChange}
                      type="text"
                      value={formState.values.name || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Description"
                      label="Description *"
                      variant="outlined"
                      size="medium"
                      name="description"
                      fullWidth
                      helperText={
                        hasError('description') ? formState.errors.description[0] : null
                      }
                      error={hasError('description')}
                      onChange={handleChange}
                      type="description"
                      value={formState.values.description || ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="large"
                      variant="contained"
                      type="submit"
                      color="primary"
                      fullWidth
                    >
                      CREATE
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      align="center"
                    >
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default SubCategoryForm;
