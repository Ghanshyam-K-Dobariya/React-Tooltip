import React from "react";
import { getHoverStyle } from "../Utils/domUtils";
import styled from "styled-components";

const TooltipContainer = styled.div``;
const RefNodeComponent = styled.div`
  width: max-content;
`;
/** we are calling getHoverStyle multiple times..
 * just put that call inside attrs and use its o/p..
 * reduce these many number of calls with just one call..
 */
const PopNodeComponent = styled.div.attrs({})`
  background: aliceblue;
  padding: 0.5em;
  border: 1px solid black;
  width: max-content;
  min-width: 90px;
  max-width: 100px;
  font-size: 13px;
  position: absolute;
  overflow-wrap: break-word;
  opacity: ${props => getHoverStyle(props).opacity};
  top: ${props => getHoverStyle(props).top};
  left: ${props => getHoverStyle(props).left};
  transform: ${props => getHoverStyle(props).transform};
  textalign: ${props => getHoverStyle(props).textAlign};
`;

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
    };
    this.refNode = null;
    this.popNode = null;
  }

  mouseEntered = () => {
    this.setState({
      isHover: true
    });
  };

  mouseLeave = () => {
    this.setState({
      isHover: false
    });
  };
  render() {
    const {
      props: { position, textAlign, align }
    } = this;
    const { isHover } = this.state;

    return (
      <TooltipContainer>
        <RefNodeComponent
          onMouseEnter={this.mouseEntered}
          onMouseLeave={this.mouseLeave}
          innerRef={refNode => {
            this.refNode = refNode;
          }}
        >
          {this.props.children}
        </RefNodeComponent>
        <PopNodeComponent
          innerRef={popNode => {
            this.popNode = popNode;
          }}
          isHover={isHover}
          position={position}
          textAlign={textAlign}
          refNode={this.refNode}
          popNode={this.popNode}
          align={align}
        >
          {this.props.content}
        </PopNodeComponent>
      </TooltipContainer>
    );
  }
}

export default Tooltip;
