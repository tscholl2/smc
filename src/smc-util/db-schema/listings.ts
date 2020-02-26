/*
Table of directory listings.
*/

import { Table } from "./types";

Table({
  name: "listings",
  fields: {
    project_id: {
      type: "uuid",
      desc: "The project id."
    },
    path: {
      type: "string",
      desc:
        "The directory that this is a listing of.  Should not start or end with a slash and is relative to home directory of project."
    },
    time: {
      type: "timestamp",
      desc: "When this directory listing was obtained."
    },
    interest: {
      type: "timestamp",
      desc:
        "When a browser last said 'I care about contents of this directory'."
    },
    listing: {
      type: "array",
      pg_type: "JSONB[]",
      desc: "The directory listing itself."
    },
    missing: {
      type: "number",
      desc:
        "If the listing is truncated due to being too large this is the number of missing entries.  The oldest entries are missing."
    }
  },
  rules: {
    desc: "Directory listings in projects",
    primary_key: ["project_id", "path"],
    user_query: {
      get: {
        pg_where: ["projects"],
        fields: {
          project_id: null,
          path: null,
          time: null,
          listing: null,
          missing: null,
          interest: null
        }
      },
      set: {
        // users can only set that they are interested in this directory
        fields: {
          project_id: "project_id",
          path: true,
          interest: true
        }
      }
    },

    project_query: {
      get: {
        pg_where: [{ "project_id = $::UUID": "project_id" }],
        fields: {
          project_id: null,
          path: null,
          time: null,
          listing: null,
          missing: null,
          interest: null
        }
      },
      set: {
        fields: {
          project_id: "project_id",
          path: true,
          listing: true,
          missing: true,
          time: true,
          interest: true
        }
      }
    }
  }
});