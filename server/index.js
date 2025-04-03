const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 4000;

// MiddleWare
const corsOptions = {
  origin: ["http://localhost:5173"],
  optionSuccessStatus: 200,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

// Connect MongoDB
const uri = process.env.MONGODB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create DB and collection
    const db = client.db("book-management-system");
    const booksCollection = db.collection("books");

    // Create a book (POST)
    app.post("/books", async (req, res) => {
      const bookData = req.body;
      try {
        const book = await booksCollection.insertOne(bookData);
        res.status(201).json({ message: "Book inserted successfully", book });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get all books (GET)
    app.get("/books", async (req, res) => {
      const {
        page,
        limit,
        genre,
        minYear,
        maxYear,
        author,
        minPrice,
        maxPrice,
        sortBy,
        order,
        search,
      } = req.query;
      try {
        const currentPage = Math.max(1, parseInt(page) || 1);
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const filter = {};

        if (search) {
          filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ];
        }

        if (genre) filter.genre = genre;

        if (minYear || maxPrice) {
          filter.publishedYear = {
            ...(minYear && { $gte: parseInt(minYear) }),
            ...(maxYear && { $lte: parseInt(maxYear) }),
          };
        }

        if (author) filter.author = author;

        if (minPrice || maxPrice) {
          filter.price = {
            ...(minPrice && { $gte: parseFloat(minPrice) }),
            ...(maxPrice && { $lte: parseFloat(maxPrice) }),
          };
        }

        const sortOption = { [sortBy || "title"]: order === "desc" ? -1 : 1 };

        const [books, totalBooks] = await Promise.all([
          booksCollection
            .find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(perPage)
            .toArray(),
          booksCollection.countDocuments(filter),
        ]);

        // const books = await booksCollection.find(filter).sort(sortOption).skip(skip).limit(perPage).toArray();
        res.status(201).json({
          books,
          totalBooks,
          currentPage,
          totalPages: Math.ceil(totalBooks / perPage),
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Get single book by id (GET)
    app.get("/book/:id", async (req, res) => {
      const bookId = req.params.id;
      const query = { _id: new ObjectId(bookId) };
      try {
        const book = await booksCollection.findOne(query);
        if (!book) return res.status(404).json({ message: "Book not found!" });
        res.json(book);
        // res.send(json(book));
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Update single book by id (PUT)
    app.put("/book/:id", async (req, res) => {
      // const bookId = req.params.id;
      // const filter = { _id: new ObjectId(bookId) };
      // const option = { upsert: true };
      try {
        const updateBook = await booksCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        res.json(updateBook);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Delete single book by id (DELETE)
    app.delete("/book/:id", async (req, res) => {
      // const bookId = req.params.id;
      // const quey = { _id: new ObjectId(bookId) };
      try {
        await booksCollection.deleteOne({
          _id: new ObjectId(req.params.id),
        });
        res.json({ message: "Book deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You Successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("BooksManagement server is running");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
