import Helper from "../helpers/db_helper";

export class Common {
  public id: number | undefined = undefined;

  public created_date: Date | undefined = undefined;

  public created_by: number | undefined = undefined;

  public delete: boolean | undefined = undefined;

  public deleted_by: number | undefined = undefined;

  public deleted_date: Date | undefined = undefined;

  public modified_by: Number | undefined = undefined;

  public modified_date: Date | undefined = undefined;

  public _table_name: string | undefined = undefined;

  public copyFrom(copyObj: any) {
    Helper.shallowCopy(copyObj, this);
  }

  public setTableName(table_name: string) {
    this._table_name = table_name;
  }

  public getTableName() {
    return this._table_name;
  }

  /**
   * Dump this class to the log
   */
  dump() {
    console.log(this);
  }

  /**
   * Determine if this instance has a specific property
   *
   * @param {*} prop
   */
  hasUserProperty(prop: any) {
    return this.hasOwnProperty(prop);
  }
}

export default Common;
