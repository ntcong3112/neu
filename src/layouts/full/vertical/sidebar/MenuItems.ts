import { uniqueId } from 'lodash';
import slugify from 'slugify';
import { IconPoint, IconBook, IconReportMoney } from '@tabler/icons';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

slugify.extend({ đ: 'd', Đ: 'd' });
const toSlug = (s: string) => slugify(s, { lower: true, strict: true, locale: 'vi' });

const ctx = require.context('../../../../resources', true, /\.json$/);
const folderMap = new Map<string, MenuitemsType>();

ctx.keys().forEach((raw) => {
  const match = raw.match(/^\.\/([^/]+)\/(.+)\.json$/);
  if (!match) return;

  const [, folder, file] = match;
  const folderSlug = toSlug(folder);
  const fileSlug = toSlug(file);

  if (!folderMap.has(folder)) {
    folderMap.set(folder, {
      id: uniqueId(),
      title: folder,
      icon: IconBook,
      href: `/${folderSlug}`,
      children: [],
    });
  }

  folderMap.get(folder)!.children!.push({
    id: uniqueId(),
    title: file,
    icon: IconPoint,
    href: `/${folderSlug}/${fileSlug}`,
  });
});

const SPECIAL_FIRST = 'Môn Đại Cương';
const folders = Array.from(folderMap.values());
const menuFolders = [
  ...folders.filter((f) => f.title === SPECIAL_FIRST),
  ...folders
    .filter((f) => f.title !== SPECIAL_FIRST)
    .sort((a, b) => a.title!.localeCompare(b.title!, 'vi')),
];

const Menuitems: MenuitemsType[] = [
  { navlabel: true, subheader: 'Ủng Hộ Tác Giả' },
  {
    id: uniqueId(),
    title: 'ỦNG HỘ TÁC GIẢ',
    icon: IconReportMoney,
    href: `/donate`,
  },
  { navlabel: true, subheader: 'Ngành Học' },
  ...menuFolders,
];

export default Menuitems;
