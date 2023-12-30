// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// BlocksColumns holds the columns for the "blocks" table.
	BlocksColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString, Unique: true},
		{Name: "author_id", Type: field.TypeString, Default: ""},
		{Name: "speed", Type: field.TypeFloat64, Default: 1},
		{Name: "speaker", Type: field.TypeString, Default: "1"},
		{Name: "volume", Type: field.TypeFloat64, Default: 50},
		{Name: "pitch", Type: field.TypeInt, Default: 1},
		{Name: "texts", Type: field.TypeString, Default: ""},
		{Name: "duration", Type: field.TypeInt, Default: 0},
		{Name: "part_id", Type: field.TypeString},
	}
	// BlocksTable holds the schema information for the "blocks" table.
	BlocksTable = &schema.Table{
		Name:       "blocks",
		Columns:    BlocksColumns,
		PrimaryKey: []*schema.Column{BlocksColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "blocks_parts_blocks",
				Columns:    []*schema.Column{BlocksColumns[8]},
				RefColumns: []*schema.Column{PartsColumns[0]},
				OnDelete:   schema.NoAction,
			},
		},
	}
	// PartsColumns holds the columns for the "parts" table.
	PartsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString, Unique: true},
		{Name: "name", Type: field.TypeString, Default: "新しいパート"},
		{Name: "author_id", Type: field.TypeString, Default: ""},
		{Name: "work_id", Type: field.TypeString},
	}
	// PartsTable holds the schema information for the "parts" table.
	PartsTable = &schema.Table{
		Name:       "parts",
		Columns:    PartsColumns,
		PrimaryKey: []*schema.Column{PartsColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "parts_works_parts",
				Columns:    []*schema.Column{PartsColumns[3]},
				RefColumns: []*schema.Column{WorksColumns[0]},
				OnDelete:   schema.NoAction,
			},
		},
	}
	// UsersColumns holds the columns for the "users" table.
	UsersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString, Unique: true},
		{Name: "google_id", Type: field.TypeString, Unique: true},
		{Name: "stripe_id", Type: field.TypeString, Default: ""},
		{Name: "point", Type: field.TypeInt, Default: 0},
	}
	// UsersTable holds the schema information for the "users" table.
	UsersTable = &schema.Table{
		Name:       "users",
		Columns:    UsersColumns,
		PrimaryKey: []*schema.Column{UsersColumns[0]},
	}
	// WorksColumns holds the columns for the "works" table.
	WorksColumns = []*schema.Column{
		{Name: "id", Type: field.TypeString, Unique: true},
		{Name: "name", Type: field.TypeString},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "author_id", Type: field.TypeString},
	}
	// WorksTable holds the schema information for the "works" table.
	WorksTable = &schema.Table{
		Name:       "works",
		Columns:    WorksColumns,
		PrimaryKey: []*schema.Column{WorksColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "works_users_works",
				Columns:    []*schema.Column{WorksColumns[3]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.NoAction,
			},
		},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		BlocksTable,
		PartsTable,
		UsersTable,
		WorksTable,
	}
)

func init() {
	BlocksTable.ForeignKeys[0].RefTable = PartsTable
	PartsTable.ForeignKeys[0].RefTable = WorksTable
	WorksTable.ForeignKeys[0].RefTable = UsersTable
}
