import './index.css'

const TabItems = props => {
  const {eachtab, onChangeTab, isActive} = props
  const {label, value} = eachtab

  const clsBtn = isActive ? 'tab-item-btn active-tab' : 'tab-item-btn'

  const changeTab = () => {
    onChangeTab(value)
  }
  return (
    <li>
      <button className={clsBtn} type="button" onClick={changeTab}>
        {label}
      </button>
    </li>
  )
}

export default TabItems
