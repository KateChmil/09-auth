
'use client';
import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const tags = ["All", "Todo", "Work", "Personal", "Shopping", "Meeting"];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

    return (
        <div  className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}> Notes ▾ </button>
             { isOpen && (<ul className={css.menuList}>
          {tags.map((tag) => (
              <li className={css.menuItem} key={tag} >
                  <Link href={`/notes/filter/${tag}`} onClick={toggle} className = {css.menuLink}>
                {tag}
              </Link>
              </li>
         ))}
                
              </ul > )}
      </div>
  );
};

export default TagsMenu;
          
              

               