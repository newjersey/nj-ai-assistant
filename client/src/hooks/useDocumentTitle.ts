<<<<<<< HEAD
// useDocumentTitle.js
import { useEffect } from 'react';

// function useDocumentTitle(title, prevailOnUnmount = false) {
// const defaultTitle = useRef(document.title);
function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // useEffect(
  //   () => () => {
  //     if (!prevailOnUnmount) {
  //       document.title = defaultTitle.current;
  //     }
  //   }, []
  // );
=======
import { useEffect } from 'react';
import { setDocumentTitle } from '~/utils';

function useDocumentTitle(title: string) {
  useEffect(() => {
    setDocumentTitle(title, true);
  }, [title]);
>>>>>>> upstream/main
}

export default useDocumentTitle;
