import React from "react";
import styles from "./BugList.scss";
import {definitions} from "../../../schema/query_options";
import {columnTransforms} from "./columnTransforms";

function getDisplayName(id) {
  return definitions[id] ? definitions[id].displayName : id;
}

function getRowClassName(bug) {
  const classNames = [];
  if (bug.status === "RESOLVED") classNames.push(styles.resolved);
  else if (bug.assigned_to === "nobody@mozilla.org") classNames.push(styles.unassigned);
  return classNames.join(" ");
}

export class BugList extends React.PureComponent {
  renderColumn(columnId, bug) {
    const columnTransform = this.props.columnTransforms[columnId];
    const value = columnTransform ? columnTransform(bug[columnId], bug) : bug[columnId];
    return (<td key={columnId}>{value}</td>);
  }
  render() {
    const {props} = this;
    if (!props.bugs.length) {
      return <div>Loading...</div>;
    }
    return (<table className={styles.bugTable}>
      <thead>
        <tr>
          {props.columns.map(id => {
            return(<th key={id}>{getDisplayName(id)}</th>)
          })}
        </tr>
      </thead>
      <tbody>
        {props.bugs.map(bug => (<tr className={getRowClassName(bug)} key={bug.id}>
          {props.columns.map(columnId => this.renderColumn(columnId, bug))}
        </tr>))}
      </tbody>
    </table>);
  }
}

BugList.defaultProps = {
  bugs: [],
  columns: ["id", "summary", "assigned_to", "priority"],
  columnTransforms
};