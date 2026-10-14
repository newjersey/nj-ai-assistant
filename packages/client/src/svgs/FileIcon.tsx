import { JSX } from 'react/jsx-runtime';
import type { TFile } from 'librechat-data-provider';

export default function FileIcon({
  file,
  fileType,
}: {
  file?: Partial<TFile> & { progress?: number };
  fileType: {
<<<<<<< HEAD
    fill: string;
=======
    /** A CSS colour for the tile; `fillClassName` takes precedence when both are set. */
    fill?: string;
    /** The tile's fill utility, such as `fill-file-document`, so a theme role paints it. */
    fillClassName?: string;
>>>>>>> upstream/main
    paths: React.FC;
    title: string;
  };
}): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      fill="none"
<<<<<<< HEAD
      className="h-10 w-10 flex-shrink-0"
=======
      className="h-10 w-10 shrink-0"
>>>>>>> upstream/main
      width="36"
      height="36"
      aria-hidden="true"
    >
<<<<<<< HEAD
      <rect width="36" height="36" rx="6" fill={fileType.fill} />
=======
      <rect width="36" height="36" rx="6" fill={fileType.fill} className={fileType.fillClassName} />
>>>>>>> upstream/main
      {(file?.['progress'] ?? 1) >= 1 && <>{<fileType.paths />}</>}
    </svg>
  );
}
