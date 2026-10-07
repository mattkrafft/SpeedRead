// Variables used by Scriptable.
// icon-color: deep-gray; icon-glyph: book-open;

const APP_URL = "https://mattkrafft.github.io/SpeedRead/";
const DATA_FILE = "speedread-widget.json";
const COVER_FILE = "speedread-widget-cover.jpg";
const fm = FileManager.local();
const dataPath = fm.joinPath(fm.documentsDirectory(), DATA_FILE);
const coverPath = fm.joinPath(fm.documentsDirectory(), COVER_FILE);

function integer(value, fallback = 0) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

function compact(value) {
  if (value < 1000) return String(value);
  const thousands = value / 1000;
  return `${thousands < 10 && value % 1000 ? thousands.toFixed(1) : Math.round(thousands)}k`;
}

async function saveIncomingData() {
  const query = args.queryParameters || {};
  if (!query.total) return false;

  const data = {
    current: integer(query.current, 1),
    total: integer(query.total),
    minutes: integer(query.minutes),
    title: query.title || "SpeedRead",
    appUrl: query.appUrl || APP_URL,
    updatedAt: new Date().toISOString()
  };

  fm.writeString(dataPath, JSON.stringify(data));

  if (query.cover) {
    try {
      const request = new Request(query.cover);
      fm.writeImage(coverPath, await request.loadImage());
    } catch (error) {
      console.warn(`Could not update the cover: ${error}`);
    }
  } else if (fm.fileExists(coverPath)) {
    fm.remove(coverPath);
  }

  return true;
}

function loadData() {
  if (!fm.fileExists(dataPath)) {
    return { current: 1, total: 35000, minutes: 117, title: "SpeedRead", appUrl: APP_URL };
  }
  try {
    return JSON.parse(fm.readString(dataPath));
  } catch {
    return { current: 1, total: 35000, minutes: 117, title: "SpeedRead", appUrl: APP_URL };
  }
}

function makeWidget(data) {
  const widget = new ListWidget();
  widget.url = data.appUrl || APP_URL;
  widget.setPadding(14, 14, 14, 14);

  if (fm.fileExists(coverPath)) {
    widget.backgroundImage = fm.readImage(coverPath);
  } else {
    const gradient = new LinearGradient();
    gradient.colors = [new Color("7e2f28"), new Color("241714")];
    gradient.locations = [0, 1];
    widget.backgroundGradient = gradient;
  }

  const shade = widget.addStack();
  shade.layoutVertically();
  shade.backgroundColor = new Color("000000", 0.48);
  shade.cornerRadius = 12;
  shade.setPadding(10, 10, 10, 10);

  const progress = shade.addText(`${compact(data.current)}/${compact(data.total)}`);
  progress.textColor = Color.white();
  progress.font = Font.boldSystemFont(22);
  progress.minimumScaleFactor = 0.65;
  progress.lineLimit = 1;

  shade.addSpacer(3);

  const remaining = shade.addText(`${data.minutes} min left`);
  remaining.textColor = Color.white();
  remaining.font = Font.semiboldSystemFont(14);
  remaining.minimumScaleFactor = 0.7;
  remaining.lineLimit = 1;

  widget.addSpacer();
  widget.refreshAfterDate = new Date(Date.now() + 30 * 60 * 1000);
  return widget;
}

const receivedUpdate = await saveIncomingData();
const widget = makeWidget(loadData());

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
  if (receivedUpdate) {
    const notice = new Notification();
    notice.title = "SpeedRead widget updated";
    notice.body = "Your current word and remaining time were saved.";
    await notice.schedule();
  }
}

Script.complete();
