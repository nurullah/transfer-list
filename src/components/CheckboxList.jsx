import PropTypes from 'prop-types';

// UI
import styles from './CheckboxList.module.scss';
import { PlusIcon } from './Icons';

function CheckboxList({
  data,
  type,
  className,
  onChange,
  onSubmit,
  ...props
}) {

  const handleSubmit = (e) => {
    e.preventDefault();

    // callback
    if (onSubmit) {
      const data = new FormData(e.currentTarget);

      // check title
      if (! data.get('name')?.length) return;
  
      // add id
      data.append('id', Date.now());
      data.append('type', type);

      // return to callback
      onSubmit(Object.fromEntries(data));
    }

    e.currentTarget.reset();
  }

  const handleChange = (item, status) => {
    if (onChange) {
      onChange({
        ...item,
        checked: status
      });
    }
  }

  return (
    <div className={[styles.self].concat(className).join(' ')} {...props}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="name" placeholder={`Add ${type} item...`}/>
        <button type="submit">
          <PlusIcon />
        </button>
      </form>
      <ul className={styles.list}>
        {data.map((item, key) => 
          <li key={key}>
            <label>
              <input 
                type="checkbox"
                value={item.name}
                checked={item.checked}
                onChange={e => handleChange(item, e.target.checked)} />
              <span>{item.name}</span>
            </label>
          </li>
        )}
      </ul>
    </div>
  )
}

CheckboxList.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default CheckboxList;