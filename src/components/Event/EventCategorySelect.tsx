"use client";

import React, { useState, useEffect } from "react";
import { getEventCategories } from "@/api/getFilters";

interface EventCategorySelectProps {
  categoryId: number | undefined;
  setCategoryId: (categoryId: number | undefined) => void;
}

const EventCategorySelect: React.FC<EventCategorySelectProps> = ({
  categoryId,
  setCategoryId,
}) => {
  const [categories, setCategories] = useState<
    { eventCategoryId: number; eventCategory: string }[]
  >([]);

  useEffect(() => {
    const loadEventCategories = async () => {
      try {
        const categoryData = await getEventCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching event categories:", error);
        setCategories([]);
      }
    };
    loadEventCategories();
  }, []);

  return (
    <select
      value={categoryId || ""}
      onChange={(e) =>
        setCategoryId(e.target.value ? Number(e.target.value) : undefined)
      }
      className="rounded border border-gray-300 bg-gray-200 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" className="bg-gray-200 text-gray-700">
        Select Category
      </option>
      {categories.map((category) => (
        <option
          key={category.eventCategoryId}
          value={category.eventCategoryId}
          className="bg-white text-gray-700 hover:bg-gray-100"
        >
          {category.eventCategory}
        </option>
      ))}
    </select>
  );
};

export default EventCategorySelect;
