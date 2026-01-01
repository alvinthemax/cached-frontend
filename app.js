// ===== Service Worker =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    // WAJIB reload agar SW mengontrol halaman
    if (!navigator.serviceWorker.controller) {
      location.reload();
    }
  });
}

// ===== Online / Offline Status =====
const statusEl = document.getElementById('status');

function updateStatus() {
  statusEl.textContent = navigator.onLine ? 'Online' : 'Offline';
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();

// ===== Notes Logic (localStorage) =====
const STORAGE_KEY = 'offline_notes';

function getNotes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function renderNotes() {
  const list = document.getElementById('notesList');
  list.innerHTML = '';

  getNotes().forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    list.appendChild(li);
  });
}

function saveNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const notes = getNotes();
  notes.push(text);
  saveNotes(notes);

  input.value = '';
  renderNotes();
}

// Render saat load
renderNotes();
