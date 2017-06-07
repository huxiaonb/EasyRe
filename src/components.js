import RegisterForm from './components/RegisterForm'

// 尽量别直接用全局变量 $
const $ = jQuery

class LegoComponent{

    constructor(selector){
        this.$el = selector
    }
    // 暴露插件
    registerForm(...args){
        return RegisterForm(this.$el, ...args)
    }
}

const Lego = selector => {
    let $el;
    if(typeof selector === 'string' || selector.nodeType){
        $el = $(selector)
    } else {
        $el = selector
    }
    return new LegoComponent($el)
}
export default Lego


