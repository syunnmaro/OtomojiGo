package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Part holds the schema definition for the Part entity.
type Part struct {
	ent.Schema
}

// Fields of the Part.
func (Part) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}).Unique(),
		field.String("name"),
		field.String("work_id"),
		field.String("author_id"),
	}
}

// Edges of the Part.
func (Part) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("work", Work.Type).
			Ref("parts").
			Required().
			Unique().
			Field("work_id"),
		edge.To("blocks", Block.Type),
	}
}
func (Part) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
