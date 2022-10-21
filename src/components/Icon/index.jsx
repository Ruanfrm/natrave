import { ReactComponent as arrowLeft } from './svg/arrow-left.svg'
import { ReactComponent as arrowRight } from './svg/arrow-right.svg'
import { ReactComponent as back } from './svg/back.svg'
import { ReactComponent as profile } from './svg/profile.svg'

const icons = {
    arrowLeft,
    arrowRight,
    back,
    profile
}

export const Icon = ({name, ...props})=>{
    const Element = icons[name]
    return <Element {...props} />
}
  