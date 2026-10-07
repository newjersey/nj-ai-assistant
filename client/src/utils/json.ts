export function isJson(str: string) {
  try {
    JSON.parse(str);
<<<<<<< HEAD
  } catch (e) {
=======
  } catch {
>>>>>>> upstream/main
    return false;
  }
  return true;
}

export function formatJSON(json: string) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
<<<<<<< HEAD
  } catch (e) {
=======
  } catch {
>>>>>>> upstream/main
    return json;
  }
}

export function extractJson(text: string) {
  let openBraces = 0;
  let startIndex = -1;
<<<<<<< HEAD

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '{') {
=======
  let inString = false;
  let escaped = false;

  for (let i = 0; i < text.length; i++) {
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (text[i] === '\\') {
        escaped = true;
      } else if (text[i] === '"') {
        inString = false;
      }
      continue;
    }
    if (text[i] === '"' && openBraces > 0) {
      inString = true;
    } else if (text[i] === '{') {
>>>>>>> upstream/main
      if (openBraces === 0) {
        startIndex = i;
      }
      openBraces++;
<<<<<<< HEAD
    } else if (text[i] === '}') {
=======
    } else if (text[i] === '}' && openBraces > 0) {
>>>>>>> upstream/main
      openBraces--;
      if (openBraces === 0 && startIndex !== -1) {
        return text.slice(startIndex, i + 1);
      }
    }
  }

  return '';
}
