import { useState } from 'react';
import defaultItems from '../data/transfer-items.json';

// components
import CheckboxList from './CheckboxList';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon
} from './Icons';

// UI
import styles from './TransferList.module.scss';

export default function TransferList() {
  const [data, setData] = useState(defaultItems);
  const sourceItems = data.filter(item => item.type === 'source');
  const targetItems = data.filter(item => item.type === 'target');
  const checkedSourceItems = sourceItems.filter(i => i.checked);
  const checkedTargetItems = targetItems.filter(i => i.checked);

  const addItem = (item) => setData((prev) => [ ...prev, item ]);

  const changeItem = (item) => {
    setData(prev => prev.map(prevItem => {
      if (prevItem.id === item.id) {
        return item;
      }

      return prevItem;
    }))
  };

  const _transferItems = (currentType, newType, isCheck) => {
    
    setData(prev => prev.map(prevItem => {
      if (prevItem.type === currentType) {

        // isCheck filter is enable
        if (isCheck !== undefined) {
          if (! prevItem.checked) return prevItem;
        }

        return {
          ...prevItem,
          type: newType,
          checked: false
        }
      }

      return prevItem;
    }));
  }

  const handleTransferSourceItems = () => {
    if (! checkedSourceItems.length) return;

    // update
    _transferItems('source', 'target', true);
  }

  const handleTransferTargetItems = () => {
    if (! checkedTargetItems.length) return;

    // update
    _transferItems('target', 'source', true);
  }

  const handleTransferAllSourceItems = () => {
    if (! sourceItems.length) return;

    // update
    _transferItems('source', 'target', undefined);
  }

  const handleTransferAllTargetItems = () => {
    if (! targetItems.length) return;

    // update
    _transferItems('target', 'source', undefined);
  }

  return (
    <div className={styles.self}>
      <CheckboxList 
        type="source" 
        data={sourceItems} 
        className={styles.source}
        onChange={changeItem}
        onSubmit={addItem} />
      <div className={styles.switch}>
        <button 
          title="Transfer all items into source"
          onClick={handleTransferAllTargetItems}
          disabled={! targetItems.length}>
            <ChevronsLeftIcon />
          </button>
        <button 
          title="Transfer items into Source"
          onClick={handleTransferTargetItems}
          disabled={! checkedTargetItems.length}>
            <ChevronLeftIcon />
          </button>
        <button 
          title="Transfer items into Target"
          onClick={handleTransferSourceItems}
          disabled={! checkedSourceItems.length}>
            <ChevronRightIcon />
          </button>
        <button 
          title="Transfer all items into target"
          onClick={handleTransferAllSourceItems}
          disabled={! sourceItems.length}>
            <ChevronsRightIcon />
          </button>
      </div>
      <CheckboxList 
        type="target" 
        data={targetItems} 
        className={styles.target}
        onChange={changeItem}
        onSubmit={addItem} />
    </div>
  )
}