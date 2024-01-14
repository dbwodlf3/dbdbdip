import { WordCount } from "component/table";
import { parseCommentTable } from "../../lib/parser/comment_parser";
import { exampleStrings } from "../test/example/sql";
import { LogoComponent } from "component/ui/logo.component";
import { SearchComponent } from "component/ui/search.component";
import { CardItemComponent } from "component/db/card-item.component";
import { RecentItemListComponent } from "component/db/recent-item-list.component";
import { DatabaseItemListComponent } from "component/db/database-item-list.component";
import { TableItemListComponent } from "component/db/table-item-list.component";
import { ClusterItemListComponent } from "component/db/cluster-item-list.component";
import { TableDocComponent } from "component/db/doc/table-doc.component copy";
import { DatabaseDocComponent } from "component/db/doc/database-doc.component";

let exampleInput = exampleStrings;

let parsedData = parseCommentTable(exampleInput);

let sidebar = "";

let contentBody = "";

WordCount;
LogoComponent;
SearchComponent;
CardItemComponent;
RecentItemListComponent;
DatabaseItemListComponent;
ClusterItemListComponent;
TableItemListComponent;

DatabaseDocComponent;
TableDocComponent;

console.log(parsedData);
