// Code generated by ent, DO NOT EDIT.

package ent

import (
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/schema"
	"graphql-test-api/ent/user"
	"graphql-test-api/ent/work"
	"time"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	blockFields := schema.Block{}.Fields()
	_ = blockFields
	// blockDescID is the schema descriptor for id field.
	blockDescID := blockFields[0].Descriptor()
	// block.DefaultID holds the default value on creation for the id field.
	block.DefaultID = blockDescID.Default.(func() string)
	partFields := schema.Part{}.Fields()
	_ = partFields
	// partDescID is the schema descriptor for id field.
	partDescID := partFields[0].Descriptor()
	// part.DefaultID holds the default value on creation for the id field.
	part.DefaultID = partDescID.Default.(func() string)
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescStripeID is the schema descriptor for stripe_id field.
	userDescStripeID := userFields[2].Descriptor()
	// user.DefaultStripeID holds the default value on creation for the stripe_id field.
	user.DefaultStripeID = userDescStripeID.Default.(string)
	// userDescPoint is the schema descriptor for point field.
	userDescPoint := userFields[3].Descriptor()
	// user.DefaultPoint holds the default value on creation for the point field.
	user.DefaultPoint = userDescPoint.Default.(int)
	// userDescID is the schema descriptor for id field.
	userDescID := userFields[0].Descriptor()
	// user.DefaultID holds the default value on creation for the id field.
	user.DefaultID = userDescID.Default.(func() string)
	workFields := schema.Work{}.Fields()
	_ = workFields
	// workDescName is the schema descriptor for name field.
	workDescName := workFields[1].Descriptor()
	// work.DefaultName holds the default value on creation for the name field.
	work.DefaultName = workDescName.Default.(string)
	// workDescCreatedAt is the schema descriptor for created_at field.
	workDescCreatedAt := workFields[2].Descriptor()
	// work.DefaultCreatedAt holds the default value on creation for the created_at field.
	work.DefaultCreatedAt = workDescCreatedAt.Default.(time.Time)
	// workDescID is the schema descriptor for id field.
	workDescID := workFields[0].Descriptor()
	// work.DefaultID holds the default value on creation for the id field.
	work.DefaultID = workDescID.Default.(func() string)
}
