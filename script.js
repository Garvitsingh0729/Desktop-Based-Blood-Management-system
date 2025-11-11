// Client-side demo logic (localStorage-based for this static demo)
function saveToList(key, obj){
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  arr.push(obj);
  localStorage.setItem(key, JSON.stringify(arr));
}
function getList(key){ return JSON.parse(localStorage.getItem(key) || "[]"); }

// Donor registration
const donorForm = document.getElementById('donorForm');
if(donorForm){
  donorForm.addEventListener('submit', e=>{
    e.preventDefault();
    const obj = {
      name:document.getElementById('donorName').value,
      email:document.getElementById('donorEmail').value,
      phone:document.getElementById('donorPhone').value,
      bg:document.getElementById('donorBg').value,
      city:document.getElementById('donorCity').value,
      created: new Date().toISOString()
    };
    saveToList('donors', obj);
    alert('Donor registered (demo). Redirecting to login.');
    location.href = 'login.html';
  });
}

// Seeker registration
const seekerForm = document.getElementById('seekerForm');
if(seekerForm){
  seekerForm.addEventListener('submit', e=>{
    e.preventDefault();
    const obj = {
      name:document.getElementById('seekerName').value,
      email:document.getElementById('seekerEmail').value,
      phone:document.getElementById('seekerPhone').value,
      bg:document.getElementById('seekerBg').value,
      city:document.getElementById('seekerCity').value,
      created: new Date().toISOString()
    };
    saveToList('seekers', obj);
    alert('Seeker registered (demo). Redirecting to login.');
    location.href = 'login.html';
  });
}

// Login (simple demo)
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value;
    if(user==='admin' && pass==='admin123'){
      localStorage.setItem('isAdmin','1'); location.href='admin.html'; return;
    }
    // naive: check donors and seekers by email or name
    const donors = getList('donors'), seekers=getList('seekers');
    const found = donors.concat(seekers).find(u => u.email===user || u.name===user);
    if(found){ localStorage.setItem('user', JSON.stringify(found)); alert('Login successful (demo)'); location.href='home.html';}
    else alert('Not found. Please register first (demo).');
  });
}

// Admin page listing
if(document.getElementById('donorList') || document.getElementById('seekerList')){
  const donors = getList('donors'), seekers=getList('seekers');
  const dList = document.getElementById('donorList'), sList=document.getElementById('seekerList');
  if(dList) donors.forEach(d=>{ const el=document.createElement('div'); el.className='item'; el.textContent = d.name + ' — ' + d.bg + ' — ' + d.city + ' — ' + d.phone; dList.appendChild(el); });
  if(sList) seekers.forEach(s=>{ const el=document.createElement('div'); el.className='item'; el.textContent = s.name + ' — needs ' + s.bg + ' — ' + s.city + ' — ' + s.phone; sList.appendChild(el); });
}

// Home quicklist
if(document.getElementById('quicklist')){
  const donors = getList('donors');
  const q = document.getElementById('quicklist');
  if(donors.length===0) q.innerHTML='<p class="muted">No donors registered yet (demo).</p>';
  donors.slice(0,6).forEach(d=>{ const el=document.createElement('div'); el.className='item'; el.innerHTML = '<strong>'+d.name+'</strong> — '+d.bg+' — '+d.city+' — <a href="tel:'+d.phone+'">Call</a>'; q.appendChild(el); });
}

// Contact form (demo)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Message sent (demo). We will contact you on email.');
    contactForm.reset();
  });
}
