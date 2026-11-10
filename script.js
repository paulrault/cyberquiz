const questions = [
  { category: "Réseaux", q: "Quel équipement permet de relier plusieurs réseaux IP différents ?", a: ["Un commutateur", "Un routeur", "Un point d'accès", "Un répéteur"], correct: 1, explain: "Le routeur transfère les paquets entre des réseaux IP différents." },
  { category: "Réseaux", q: "Quel service attribue automatiquement une adresse IP à un poste ?", a: ["DNS", "HTTP", "DHCP", "SSH"], correct: 2, explain: "DHCP distribue automatiquement les paramètres réseau aux clients." },
  { category: "Réseaux", q: "Quel est le rôle principal du DNS ?", a: ["Chiffrer les fichiers", "Traduire un nom en adresse IP", "Attribuer une adresse MAC", "Bloquer les virus"], correct: 1, explain: "Le DNS associe notamment les noms de domaine aux adresses IP." },
  { category: "Réseaux", q: "Combien de bits contient une adresse IPv4 ?", a: ["16 bits", "32 bits", "48 bits", "128 bits"], correct: 1, explain: "Une adresse IPv4 est codée sur 32 bits." },
  { category: "Systèmes", q: "Quelle commande Debian permet de mettre à jour la liste des paquets ?", a: ["apt update", "apt reboot", "ip update", "systemctl update"], correct: 0, explain: "apt update actualise l'index local des paquets disponibles." },
  { category: "Systèmes", q: "Quel système de fichiers est couramment utilisé par défaut sur Debian ?", a: ["NTFS", "FAT32", "ext4", "APFS"], correct: 2, explain: "ext4 est un système de fichiers Linux très répandu." },
  { category: "Systèmes", q: "Quel outil Microsoft permet de virtualiser des machines sur Windows Server ?", a: ["IIS", "Hyper-V", "Active Directory", "BitLocker"], correct: 1, explain: "Hyper-V est l'hyperviseur de virtualisation de Microsoft." },
  { category: "Systèmes", q: "Quelle commande affiche l'adresse IP sous Linux ?", a: ["ip a", "show ip", "dir ip", "net user"], correct: 0, explain: "La commande ip a affiche les interfaces et leurs adresses." },
  { category: "Cybersécurité", q: "Qu'est-ce que le phishing (hameçonnage) ?", a: ["Une sauvegarde", "Une tentative de tromperie pour obtenir des informations", "Une mise à jour", "Un type de câble"], correct: 1, explain: "Le phishing cherche à pousser une personne à communiquer des informations ou à effectuer une action risquée." },
  { category: "Cybersécurité", q: "À quoi sert un pare-feu ?", a: ["À filtrer les communications réseau", "À augmenter la mémoire", "À créer des comptes", "À compresser les fichiers"], correct: 0, explain: "Un pare-feu applique des règles pour autoriser ou bloquer des communications." },
  { category: "Cybersécurité", q: "Quelle pratique renforce un compte en ligne ?", a: ["Réutiliser le même mot de passe", "Partager son mot de passe", "Activer l'authentification multifacteur", "Désactiver les mises à jour"], correct: 2, explain: "L'authentification multifacteur ajoute une vérification supplémentaire." },
  { category: "Cybersécurité", q: "Pourquoi installer les mises à jour de sécurité ?", a: ["Pour corriger des vulnérabilités", "Pour supprimer les sauvegardes", "Pour désactiver le réseau", "Pour changer l'écran"], correct: 0, explain: "Les mises à jour corrigent notamment des failles connues." },
  { category: "Informatique générale", q: "Quel composant exécute les instructions d'un ordinateur ?", a: ["Le processeur", "Le clavier", "L'écran", "Le boîtier"], correct: 0, explain: "Le processeur (CPU) exécute les instructions des programmes." },
  { category: "Informatique générale", q: "Quel composant conserve les données même après extinction ?", a: ["La RAM", "Le SSD", "Le cache CPU", "Les registres"], correct: 1, explain: "Un SSD est un stockage non volatil : les données restent enregistrées sans alimentation." },
  { category: "Informatique générale", q: "Que signifie l'extension .html ?", a: ["Un fichier audio", "Une page web", "Une image", "Une archive"], correct: 1, explain: "HTML est le langage de balisage utilisé pour structurer les pages web." },
  { category: "Informatique générale", q: "Quel raccourci clavier permet généralement de copier un élément sous Windows ?", a: ["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"], correct: 2, explain: "Ctrl + C copie la sélection ; Ctrl + V la colle." }
];

const homeScreen = document.querySelector("#home-screen");
const quizScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");
const categorySelect = document.querySelector("#category");
const startBtn = document.querySelector("#start-btn");
const questionText = document.querySelector("#question-text");
const answersEl = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextBtn = document.querySelector("#next-btn");
const quitBtn = document.querySelector("#quit-btn");
const restartBtn = document.querySelector("#restart-btn");
const homeBtn = document.querySelector("#home-btn");

let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function showScreen(screen) {
  [homeScreen, quizScreen, resultScreen].forEach(item => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function startQuiz() {
  const category = categorySelect.value;
  const pool = category === "all" ? questions : questions.filter(item => item.category === category);
  quizQuestions = shuffle(pool);
  currentIndex = 0;
  score = 0;
  showScreen(quizScreen);
  displayQuestion();
}

function displayQuestion() {
  answered = false;
  const item = quizQuestions[currentIndex];
  document.querySelector("#category-label").textContent = item.category;
  document.querySelector("#question-counter").textContent = `Question ${currentIndex + 1} / ${quizQuestions.length}`;
  document.querySelector("#progress-bar").style.width = `${(currentIndex / quizQuestions.length) * 100}%`;
  questionText.textContent = item.q;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.classList.add("hidden");
  answersEl.replaceChildren();

  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    answersEl.append(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const item = quizQuestions[currentIndex];
  const buttons = [...answersEl.querySelectorAll("button")];
  buttons.forEach(button => button.disabled = true);
  buttons[item.correct].classList.add("correct");

  if (selectedIndex === item.correct) {
    score++;
    feedback.textContent = `Bonne réponse ! ${item.explain}`;
    feedback.classList.add("good");
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    feedback.textContent = `Pas tout à fait. ${item.explain}`;
    feedback.classList.add("bad");
  }

  nextBtn.textContent = currentIndex === quizQuestions.length - 1 ? "Voir mon résultat →" : "Question suivante →";
  nextBtn.classList.remove("hidden");
}

function showResults() {
  document.querySelector("#final-score").textContent = score;
  document.querySelector("#total-score").textContent = quizQuestions.length;
  document.querySelector("#progress-bar").style.width = "100%";
  const ratio = score / quizQuestions.length;
  document.querySelector("#result-message").textContent =
    ratio === 1 ? "Excellent ! Toutes les réponses sont correctes." :
    ratio >= 0.7 ? "Très bon résultat ! Continue comme ça." :
    ratio >= 0.4 ? "Bon début ! Quelques révisions et tu progresseras." :
    "Pas de souci : l'essentiel est d'apprendre. Tu peux réessayer !";
  showScreen(resultScreen);
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizQuestions.length) displayQuestion();
  else showResults();
});
quitBtn.addEventListener("click", () => showScreen(homeScreen));
restartBtn.addEventListener("click", startQuiz);
homeBtn.addEventListener("click", () => showScreen(homeScreen));
