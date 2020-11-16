import css from './styles.css';
import less from './styles.less';
import scss from './styles.scss';
import sss from './styles.sss';
import styl from './styles.styl';

export default function classNameList() {
  const classNames = [
    css.css,
    less.less,
    scss.scss,
    sss.sss,
    styl.styl,
  ];
  
  return classNames;
}
