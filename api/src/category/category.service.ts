import { Request, Response } from "express";
import connection from "../config/database.config";
import { ResultSetHeader } from "mysql2";

const getAll = async (req: Request, res: Response) => {
  connection.query("SELECT * from category", function (error, results) {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    res.status(200).send(results);
  });
};

const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point get one (id): ", id);

  const sql = "SELECT * FROM category WHERE id = ?";
  const values = [id];
  connection.query(sql, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "Travel not found" });
      return;
    }

    if (Array.isArray(results) && results.length === 1) {
      res.status(200).send(results[0]);
      return;
    }
  });
};

const create = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO category (name, description) VALUES (?, ?)";
  const values = [name, description];

  connection.query(sql, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while creating data" });
      return;
    }
    if ("insertId" in results) {
      console.log("results: ", (results as ResultSetHeader).insertId);
    }
    res.status(200).send({ message: "Travel created successfully" });
  });
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("end point update (id): ", id);
  console.log("end point update (body): ", req.body);

  connection.query(
    "SELECT * FROM category WHERE id = ?",
    [id],
    (error, results) => {
      console.log("results: ", results);
      console.log("error: ", error);
      if (error) {
        console.log("error: ", error);
        res.status(500).send({ error: "Error while fetching data" });
        return;
      }
      if (Array.isArray(results) && results.length === 0) {
        res.status(404).send({ error: "Travel not found" });
        return;
      }

      if (Array.isArray(results) && results.length === 1) {
        const currentCategory = results[0];
        const newCategory = {
          ...currentCategory,
          ...req.body,
        };

        console.log("newCategory: ", newCategory);

        const sqlUpdate =
          "UPDATE category SET name = ?, description = ? WHERE id = ?";
        const values = [newCategory.name, newCategory.description, id];

        connection.query(sqlUpdate, values, (error, results) => {
          if (error) {
            res.status(500).send({ error: "Error while updating data" });
            return;
          }

          res.status(200).send({ message: "Travel updated successfully" });
        });
      }
    }
  );
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("end point delete (id): ", id);

  const sqlDelete = "DELETE FROM category WHERE id = ?";
  const sqlSelect = "SELECT * FROM category WHERE id = ?";
  const values = [id];

  // Vérifier si l'id existe dans la base de données
  connection.query(sqlSelect, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }
    if (Array.isArray(results) && results.length === 0) {
      res.status(404).send({ error: "Travel not found" });
      return;
    }
  });

  // Si l'id existe, on peut supprimer
  connection.query(sqlDelete, values, (error, results) => {
    if (error) {
      res.status(500).send({ error: "Error while fetching data" });
      return;
    }

    console.log("results", results);

    res.status(200).send({ message: "Success to delete" });
  });
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
};
