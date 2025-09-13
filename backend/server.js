import express from 'express';
import db from './db.js';
import cors from 'cors';
import { nanoid } from 'nanoid';



const app = express();
const PORT = 3000;

app.use(express.json()); 

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get("/", (req, res) => {
    res.send("hi")
})


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})


//get all the notes
app.get("/api/notes", (req, res) => {
    db.query("SELECT * FROM note;" ,(err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    })
}) 

//get a single note
app.get("/api/notes/:id" ,(req, res) => {
    const noteID = req.params.id

    db.query(`SELECT * FROM note WHERE id = ?`,[noteID], (err, result) => {
        if(err) return res.status(500).json({error: err})

        if (result.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.json(result)
    } )
})

//add a note
app.post("/api/notes/" ,(req, res) => {
    const { note_title, note_content } = req.body
    const note_id = nanoid()

    db.query(`INSERT INTO note ( id ,title, content) VALUES ( ?, ?, ? )`,[ note_id , note_title, note_content], (err) => {
        if(err) return res.status(500).json({error: err})

        db.query(`SELECT * FROM note WHERE id = ?`,[note_id], (err, result) => {
            if(err) return res.status(500).json({error: err})
            res.send({ message: "Note added Succesfully", note_added: result })

        })
    })
})

//deletes a note
app.delete("/api/notes/:id" , (req, res) => {
    const noteID = req.params.id

    db.query(`DELETE FROM note WHERE id = ?`, [noteID], (err, result) => {
        if(err) return res.status(500).json({error: err})
        res.send({ message: "Note deleted Succesfully", note_added: result})
    })
})

//updates a note
app.patch("/api/notes/:id" ,(req, res) => {
    const noteID = req.params.id
    const { note_title, note_content, note_status } = req.body

    //finds the object and outputs it
    db.query(`SELECT * FROM note WHERE id = ?`,[noteID], (err, result) => {
        if(err) return res.status(500).json({error: err})

        if (result.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(result)
    } )



    // where the actual updating really happens
    db.query(
        'UPDATE note SET ',
        [noteID], (err, result) => {
        if(err) return res.status(500).json({error: err})

        if (result.length === 0) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.json(result)
    } )

})













