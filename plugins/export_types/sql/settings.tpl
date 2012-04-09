            <table cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="50%">

                <table cellspacing="2" cellpadding="0" width="100%">
                <tr>
                  <td width="150"><label for="sql_table_name">{$LANG.db_table_name}</label></td>
                  <td><input type="text" size="10" name="sql_table_name" id="sql_table_name" value="myTable" /></td>
                </tr>
                <tr>
                  <td><label for="sql_database">{$LANG.db_type}</label></td>
                  <td>
                    <select name="sql_database" id="sql_database">
                      <option value="MySQL">MySQL</option>
                      <option value="SQLite">SQLite</option>
                      <option value="Oracle">Oracle</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label><?php echo $LANG["misc_options"]?></label></td>
                  <td>
                    <div>
                      <input type="checkbox" name="sql_create_table" id="sql_create_table" checked />
                      <label for="sql_create_table"><?php echo $LANG["include_create_table_query"]?></label>
                    </div>
                    <div>
                      <input type="checkbox" name="sql_drop_table" id="sql_drop_table" checked />
                      <label for="sql_drop_table"><?php echo $LANG["include_drop_table_query"]?></label>
                    </div>
                    <div>
                      <input type="checkbox" name="enclose_with_backquotes" id="enclose_with_backquotes" checked />
                      <label for="enclose_with_backquotes"><?php echo $LANG["enclose_table_backquotes"]?></label>
                    </div>
                  </td>
                </tr>
                </table>

              </td>
              <td width="50%">

                <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td><label><?php echo $LANG["statement_type"]?></label></td>
                  <td>
                    <div>
                      <input type="radio" name="sql_statement_type" id="sst1" value="insert" checked />
                      <label for="sst1">INSERT</label>
                    </div>
                    <div>
                      <input type="radio" name="sql_statement_type" id="sst2" value="update" />
                      <label for="sst2">UPDATE</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><label><?php echo $LANG["primary_key"]?></label></td>
                  <td>
                  <div>
                    <input type="radio" name="sql_primary_key" id="spk2" value="none" />
                    <label for="spk2"><?php echo $LANG["none"]?></label>
                  </div>
                  <div>
                    <input type="radio" name="sql_primary_key" id="spk1" value="default" checked />
                    <label for="spk1"><?php echo $LANG["add_default_auto_increment_col"]?></label>
                  </div>
                  </td>
                </tr>
                </table>

              </td>
            </tr>
            </table>