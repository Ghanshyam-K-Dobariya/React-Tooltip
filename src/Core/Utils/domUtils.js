const TOP_POSITION = "top";
const BOTTOM_POSITION = "bottom";

function getViewportDimensions() {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;
  return { viewportHeight, viewportWidth };
}
export function getPopupVerticalPosition(refNode, popNode, position) {
  const possiblePositions = [TOP_POSITION, BOTTOM_POSITION];

  /* we check of given position is not valid then we start our journey by considering
    top position as default position
  */
  let finalPosition =
    possiblePositions.indexOf(position) > -1 ? position : TOP_POSITION;
  if (!refNode || !popNode) return finalPosition;

  const {
    height: refNodeHeight,
    top: spaceAboveRefNode
  } = refNode.getBoundingClientRect();
  const { height: popNodeHeight, popW } = popNode.getBoundingClientRect();
  const { viewportHeight, viewportWidth } = getViewportDimensions();
  const spaceBelowRefNode =
    viewportHeight - (spaceAboveRefNode + refNodeHeight);
  /*  
    top position will be converted to bottom position if below conditions matches
    condition 1. Space above ref node (from start of viewport) < Height of popup node
    condition 2. Space above Ref node (from start of viewport) < Space below ref node (to end of view port)
  */

  /*
    same way bottom position will be converted to top position if below 2 conditions matches
    condition 1. Space below ref node < height of pop node
    condition 2. Space below ref node < space above ref node
  */
  if (
    finalPosition === TOP_POSITION &&
    spaceAboveRefNode < popNodeHeight &&
    spaceAboveRefNode < spaceBelowRefNode
  ) {
    finalPosition = BOTTOM_POSITION;
  } else if (
    finalPosition === BOTTOM_POSITION &&
    spaceBelowRefNode < popNodeHeight &&
    spaceBelowRefNode < spaceAboveRefNode
  ) {
    finalPosition = TOP_POSITION;
  }
  /* returning final position */
  return finalPosition;
}

export function getHoverStyle(props) {
  const { refNode, popNode, isHover, textAlign } = props;
  let { position, align } = props;
  // intializing with no hover style
  let res = {
    opacity: 0,
    top: 0,
    left: 0,
    transform: "translate(0px, 0px)"
  };
  if (!isHover || !refNode || !popNode) {
  } else {
    const {
      height: refHeight,
      width: refWidth
    } = refNode.getBoundingClientRect();
    const {
      height: popHeight,
      width: popWidth
    } = popNode.getBoundingClientRect();
    position = getPopupVerticalPosition(refNode, popNode, position);

    let translateX = 0;
    let translateY = 0;
    if (position === "top") {
      translateY = (refHeight + popHeight) * -1;
    }

    if (align === "left") {
      if (refWidth > popWidth) translateX = refWidth - popWidth;
      else if (popWidth > refWidth) translateX = (popWidth - refWidth) * -1;
    } else if (align === "right") {
      /* you dont need to do anything */
    } else if (align === "center") {
      if (refWidth > popWidth)
        translateX = parseInt((refWidth - popWidth) / 2, 10);
      else if (popWidth > refWidth)
        translateX = parseInt((popWidth - refWidth) / 2, 10) * -1;
    }
    res.opacity = 1;
    res.top = "inherit";
    res.left = "inherit";
    res.transform = `translate(${translateX}px, ${translateY}px)`;
  }
  res.textAlign =
    textAlign === "left" || textAlign === "right" ? textAlign : "center";
  return res;
}
