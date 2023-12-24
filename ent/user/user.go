// Code generated by ent, DO NOT EDIT.

package user

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

const (
	// Label holds the string label denoting the user type in the database.
	Label = "user"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldGoogleID holds the string denoting the google_id field in the database.
	FieldGoogleID = "google_id"
	// FieldStripeID holds the string denoting the stripe_id field in the database.
	FieldStripeID = "stripe_id"
	// FieldPoint holds the string denoting the point field in the database.
	FieldPoint = "point"
	// EdgeWorks holds the string denoting the works edge name in mutations.
	EdgeWorks = "works"
	// Table holds the table name of the user in the database.
	Table = "users"
	// WorksTable is the table that holds the works relation/edge.
	WorksTable = "works"
	// WorksInverseTable is the table name for the Work entity.
	// It exists in this package in order to avoid circular dependency with the "work" package.
	WorksInverseTable = "works"
	// WorksColumn is the table column denoting the works relation/edge.
	WorksColumn = "author_id"
)

// Columns holds all SQL columns for user fields.
var Columns = []string{
	FieldID,
	FieldGoogleID,
	FieldStripeID,
	FieldPoint,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() string
)

// OrderOption defines the ordering options for the User queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByGoogleID orders the results by the google_id field.
func ByGoogleID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldGoogleID, opts...).ToFunc()
}

// ByStripeID orders the results by the stripe_id field.
func ByStripeID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldStripeID, opts...).ToFunc()
}

// ByPoint orders the results by the point field.
func ByPoint(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldPoint, opts...).ToFunc()
}

// ByWorksCount orders the results by works count.
func ByWorksCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newWorksStep(), opts...)
	}
}

// ByWorks orders the results by works terms.
func ByWorks(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newWorksStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newWorksStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(WorksInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, WorksTable, WorksColumn),
	)
}
