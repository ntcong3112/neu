import slugify from 'slugify';

slugify.extend({ đ: 'd', Đ: 'd' });
const toSlug = (s: string) => slugify(s, { lower: true, strict: true, locale: 'vi' });

export type Question = { id: number; question: string; answer: string };
export interface DataEntry {
  questions: Question[];
  fieldName: string;
  subjectName: string;
}
export const normalizeVi = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase();

const ctx = require.context('../../resources', true, /\.json$/);

const buildDataMap = (): Record<string, DataEntry> => {
  const map: Record<string, DataEntry> = {};

  ctx.keys().forEach((raw) => {
    const m = raw.match(/^\.\/([^/]+)\/(.+)\.json$/);
    if (!m) return;
    const [, field, subject] = m;

    map[`${toSlug(field)}/${toSlug(subject)}`] = {
      questions: ctx(raw) as Question[],
      fieldName: field,
      subjectName: subject,
    };
  });

  return map;
};

/**
 * DATA_MAP được tính **một lần duy nhất** khi file này được import lần đầu,
 * sau đó Webpack sẽ cache export => mọi component chia sẻ cùng một reference.
 */
const DATA_MAP = buildDataMap();
export default DATA_MAP;
