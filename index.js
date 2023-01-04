const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const app = express();
var cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.14pyq.mongodb.net/Eventor?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://eventor:eventor12345@cluster0.14pyq.mongodb.net/Eventor?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.connect((err) => {
  const packages = client.db("Eventor").collection("packages");
  const reviews = client.db("Eventor").collection("reviews");
  const users = client.db("Eventor").collection("users");
  const orders = client.db("Eventor").collection("orders");

  // Get ADMIN/VENDOR
  app.get("/users", (req, res) => {
    users.find(req.query).toArray((err, docs) => {
      res.send(docs);
    });
  });

  // get admins
  app.get("/allAdmins", (req, res) => {
    users.find({ role: "admin" }).toArray((err, docs) => {
      res.send(docs);
    });
  });

  // Add ADMIN/VENDOR
  app.post("/users", (req, res) => {
    const user = req.body;

    users.insertOne(user).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // Delete ADMIN/VENDOR
  app.delete("/users/:id", (req, res) => {
    users.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
      res.send(result.deletedCount > 0);
    });
  });

  // Create new REVIEW
  app.post("/reviews", (req, res) => {
    const testimonial = req.body;
    reviews.insertOne(testimonial).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // Get REVIEWS
  app.get("/reviews", (req, res) => {
    reviews.find(req.query).toArray((err, docs) => {
      res.json(docs);
    });
  });

  // Delete REVIEW
  app.delete("/reviews/:id", (req, res) => {
    reviews.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
      res.send(result.deletedCount > 0);
    });
  });

  // Create new PACKAGE
  app.post("/packages", (req, res) => {
    const package = req.body;
    packages.insertOne(package).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // Get PACKAGES
  app.get("/packages", (req, res) => {
    packages.find(req.query).toArray((err, docs) => {
      res.json(docs);
    });
  });

  // Get PACKAGES by ID
  app.post("/packagesByID", (req, res) => {
    let ids = req.body.map((abc) => ObjectId(abc));

    packages.find({ _id: { $in: ids } }).toArray((error, docs) => {
      res.send(docs);
    });
  });

  // Update PACKAGE
  app.patch("/packages/:id", (req, res) => {
    const package = req.body;
    packages
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: package })
      .then((result) => {
        res.send(result.modifiedCount > 0);
      });
  });

  // Delete PACKAGE
  app.delete("/packages/:id", (req, res) => {
    packages.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
      res.send(result.deletedCount > 0);
    });
  });

  // Create new ORDER
  app.post("/orders", (req, res) => {
    const order = req.body;
    orders.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // Get ORDERS
  app.get("/orders", (req, res) => {
    orders.find(req.query).toArray((err, docs) => {
      res.json(docs);
    });
  });

  app.get("/allOrders", (req, res) => {
    orders.find({}).toArray((err, docs) => {
      res.json(docs);
    });
  });

  app.patch("/statusUpdate/:id", (req, res) => {
    const id = req.params.id;
    const status = req.body;
    // console.log(id, status)
    orders
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: status,
        },
        { upsert: true }
      )
      .then((result) => {
        res.send(result);
        console.log(result);
      });
  });

  // new api

  ///get__Anniversary
  app.get("/getAnniversaryHall", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Hall Booking" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryDecoration", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryMusic", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Music Service" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryCake", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Cake" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryFood", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Food Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryGift", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Gift Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryTransport", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Transport" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getAnniversaryPhotography", (req, res) => {
    packages
      .find({ category: "Anniversary", subcategory: "Photography" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  ///getOfficialDecoration

  app.get("/getOfficialHall", (req, res) => {
    packages
      .find({ category: "Official", subcategory: "Hall Booking" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getOfficialDecoration", (req, res) => {
    packages
      .find({ category: "Official", subcategory: "Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getOfficialFood", (req, res) => {
    packages
      .find({ category: "Official", subcategory: "Food Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getOfficialTransport", (req, res) => {
    packages
      .find({ category: "Official", subcategory: "Transport" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getOfficialPhotography", (req, res) => {
    packages
      .find({ category: "Official", subcategory: "Photography" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  /////////Birthday
  app.get("/getBirthdayPhotography", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Photography" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayHall", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Hall Booking" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayDecoration", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayMusic", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Music Service" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayFood", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Food Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayTransport", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Transport" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayCake", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Cake" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getBirthdayGift", (req, res) => {
    packages
      .find({ category: "Birthday", subcategory: "Gift Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });

  ///// wedding

  app.get("/getWeddingHall", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Hall Booking" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getWeddingDecoration", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getWeddingMusic", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Music Service" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getWeddingFood", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Food Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getWeddingTransport", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Transport" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getWeddingCar", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Car Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getWeddingPhotography", (req, res) => {
    packages
      .find({ category: "Wedding", subcategory: "Photography" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  ///Engagement
  app.get("/getEngagementHall", (req, res) => {
    packages
      .find({ category: "Engagement", subcategory: "Hall Booking" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getEngagementDecoration", (req, res) => {
    packages
      .find({ category: "Engagement", subcategory: "Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getEngagementMusic", (req, res) => {
    packages
      .find({ category: "Engagement", subcategory: "Music Service" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getEngagementFood", (req, res) => {
    packages
      .find({ category: "Engagement", subcategory: "Food Items" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getEngagementTransport", (req, res) => {
    packages
      .find({ category: "Engagement", subcategory: "Transport" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });

  ///////Celebration

  app.get("/getCelebrationPartyHall", (req, res) => {
    packages
      .find({ category: "Celebration Party", subcategory: "Hall Booking" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getCelebrationPartyDecoration", (req, res) => {
    packages
      .find({ category: "Celebration Party", subcategory: "Decoration" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getCelebrationPartyMusic", (req, res) => {
    packages
      .find({ category: "Celebration Party", subcategory: "Music Service" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getCelebrationPartyTransport", (req, res) => {
    packages
      .find({ category: "Celebration Party", subcategory: "Transport" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getCelebrationPartyPhotography", (req, res) => {
    packages
      .find({ category: "Celebration Party", subcategory: "Photography" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });
  app.get("/getCelebrationPartyFood", (req, res) => {
    packages
      .find({ category: "Celebration Party", subcategory: "Food" })
      .toArray((err, docs) => {
        res.send(docs);
      });
  });

  app.post("/isAdmin/:email", (req, res) => {
    const email = req.params.email;

    users.find({ email: email }).toArray((err, data) =>
      data.find(function (user, index) {
        if (user.role === "admin") {
          return res.status(200).json({ message: "I am an Admin" });
        } else if (user.role === "vendor") {
          return res.status(300).json({ message: "I am a vendor" });
        }
      })
    );
  });

  console.log("Database Connection Successful!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
