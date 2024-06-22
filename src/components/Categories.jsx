import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  ListSubheader,
  Paper,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  listItem: {
    borderBottom: "1px solid #0288d1",
    backgroundColor: "#b3e5fc",
    "&:hover": {
      backgroundColor: "#81d4fa",
    },
  },
  nested: {
    paddingLeft: "1.5em",
    backgroundColor: "#e1f5fe",
  },
  categoryHeader: {
    backgroundColor: "#0277bd",
    color: "#fff",
    fontWeight: "bold",
  },
  iconButton: {
    color: "#fff",
  },
});

const Categories = ({ onSelectCategory }) => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://api.mercadolibre.com/sites/MLA/categories"
      );
      const data = await response.json();
      setCategories(data);
      const initialOpenState = {};
      data.forEach((category) => {
        initialOpenState[category.id] = false;
      });
      setOpen(initialOpenState);
    };

    fetchCategories();
  }, []);

  const handleToggle = (categoryId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [categoryId]: !prevOpen[categoryId],
    }));
  };

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <ListItem
          button
          className={classes.listItem}
          onClick={() => handleToggle(category.id)}
        >
          <ListItemText
            primary={category.name}
            onClick={() => onSelectCategory(category.id)}
          />
          <IconButton
            className={classes.iconButton}
            onClick={() => handleToggle(category.id)}
          >
            {open[category.id] ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </ListItem>
        <Collapse in={open[category.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nested}>
            {category.children_categories &&
            category.children_categories.length > 0
              ? renderCategories(category.children_categories)
              : null}
          </List>
        </Collapse>
      </React.Fragment>
    ));
  };

  return (
    <Paper style={{ backgroundColor: "#e3f2fd" }}>
      <List
        subheader={
          <ListSubheader component="div" className={classes.categoryHeader}>
            Categorías
          </ListSubheader>
        }
      >
        {renderCategories(categories)}
      </List>
    </Paper>
  );
};

export default Categories;
