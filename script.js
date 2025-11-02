const apiBaseUrl = "https://lzqf13axqc.execute-api.eu-north-1.amazonaws.com/dev";

// Add Note (POST)
document.getElementById("noteForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const note = {
    title: document.getElementById("title").value,   // ✅ Title
    note: document.getElementById("content").value, // ✅ Content
  };

  try {
    const res = await fetch(`${apiBaseUrl}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!res.ok) throw new Error(await res.text());

    document.getElementById("noteForm").reset();
    fetchNotes();
  } catch (err) {
    console.error("Add Error:", err);
    alert("❌ Error adding note: " + err);
  }
});


// Get Notes (GET)
async function fetchNotes() {
  try {
    const res = await fetch(`${apiBaseUrl}/`);
    const data = await res.json();

    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    data.forEach(note => {
      const div = document.createElement("div");
      div.className = "note-item";

      div.innerHTML = `
        <h3>${note.title || "Untitled"}</h3>
        <p>${note.note}</p>
        <button class="delete-btn" onclick="deleteNote('${note.id}')">Delete</button>
      `;

      notesList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    alert("Error fetching notes");
  }
}

async function deleteNote(id) {
  if (!confirm("Are you sure you want to delete this note?")) return;

  try {
    const res = await fetch(`${apiBaseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");

    fetchNotes(); // Refresh notes after deletion
  } catch (err) {
    console.error(err);
    alert("Error deleting note");
  }
}



fetchNotes();
