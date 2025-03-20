function emitDomEvent(target, eventName, detail) {
  const CustomEvent = target?.CustomEvent || target.ownerDocument.defaultView.CustomEvent;

  const event = new CustomEvent(eventName, { bubbles: true, detail });

  const eventTarget = (target.nodeType == null || target.nodeType === 4) ? target : target.parentElement;

  eventTarget?.dispatchEvent(event);
};

module.exports = viewContructor => function(vnode) {
  let lastDom;

  function emit(eventName, data) {
    if(!lastDom) {
      return;
    }

    emitDomEvent(lastDom, eventName, { vnode, ...data })
  }

  const instance = viewContructor(vnode, emit);

  return {
    ...instance,
    oncreate: vnode => { lastDom = vnode.dom; return instance.oncreate?.(vnode) },
    onupdate: vnode => { lastDom = vnode.dom; return instance.onupdate?.(vnode) },
  }
};

module.exports.emitDomEvent = emitDomEvent;