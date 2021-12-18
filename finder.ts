export type Delimiter = "-" | "_";

export function findClosestLocalizedText<T>(
  targetLocales: Array<string>,
  localizedTexts: Map<string, T>,
  defaultText: T,
  delimiter: Delimiter = "-"
): T {
  return forEachLocaleCandidate(
    targetLocales,
    (localeCandidate) => {
      let textCandidate = localizedTexts.get(localeCandidate);
      return { matched: !!textCandidate, res: textCandidate };
    },
    defaultText,
    delimiter
  );
}

export function findClosestLocale(
  targetLocales: Array<string>,
  availableLocales: Set<string>,
  defaultLocale: string,
  delimiter: Delimiter = "-"
): string {
  return forEachLocaleCandidate(
    targetLocales,
    (localeCandidate) => {
      return {
        matched: availableLocales.has(localeCandidate),
        res: localeCandidate,
      };
    },
    defaultLocale,
    delimiter
  );
}

export function forEachLocaleCandidate<T>(
  targetLocales: Array<string>,
  tryMatch: (localeCandidate: string) => { matched: boolean; res: T },
  defaultValue: T,
  delimiter: Delimiter = "-"
): T {
  for (let i = 0; i < targetLocales.length; i++) {
    let localeParts = targetLocales[i].split(delimiter);
    while (localeParts.length) {
      let localeCandidate = localeParts.join(delimiter);
      let { matched, res } = tryMatch(localeCandidate);
      if (matched) {
        return res;
      }
      localeParts.pop();
    }
  }
  return defaultValue;
}
