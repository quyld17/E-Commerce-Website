import React, { useState, useEffect } from "react";
import handleGetAllCategoriesAPI from "../../api/handlers/categories";
import { TbCategory, TbArrowsSort } from "react-icons/tb";
import {
  BsSortUp,
  BsSortDown,
  BsSortAlphaDown,
  BsSortAlphaUp,
} from "react-icons/bs";

export default function SideBarMaterials() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    handleGetAllCategoriesAPI(setCategories);
  }, []);

  function getItem(label, key, icon, items) {
    return {
      key,
      icon,
      items,
      label,
    };
  }

  // const sortingItems = [
  //   {
  //     label: "Sorted by",
  //     key: "sub1",
  //     icon: <TbArrowsSort style={{ fontSize: "20px" }} />,
  //     items: [
  //       {
  //         label: "Price: High-Low",
  //         key: 1,
  //         icon: <BsSortDown />,
  //       },
  //       {
  //         label: "Price: Low-High",
  //         key: 2,
  //         icon: <BsSortUp />,
  //       },
  //       {
  //         label: "Name: A-Z",
  //         key: 3,
  //         icon: <BsSortAlphaDown />,
  //       },
  //       {
  //         label: "Name: Z-A",
  //         key: 4,
  //         icon: <BsSortAlphaUp />,
  //       },
  //     ],
  //   },
  // ];

  const sortingItems = [
    getItem(
      "Sorted by",
      "sub1",
      <TbArrowsSort style={{ fontSize: "20px" }} />,
      [
        getItem("Price: High-Low", 1, <BsSortDown />),
        getItem("Price: Low-High", 2, <BsSortUp />),
        getItem("Name: A-Z", 3, <BsSortAlphaDown />),
        getItem("Name: Z-A", 4, <BsSortAlphaUp />),
      ]
    ),
  ];

  const categoryItems = [
    getItem(
      "Category",
      "sub2",
      <TbCategory style={{ fontSize: "20px" }} />,
      categories.map((cat, index) => getItem(cat.category_name, index + 5))
    ),
  ];
  return { sortingItems, categoryItems };
}
