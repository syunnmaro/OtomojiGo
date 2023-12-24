package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Work holds the schema definition for the Work entity.
type Work struct {
	ent.Schema
}

// Fields of the Work.
func (Work) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}),
		field.String("name"),
		field.String("created_at"),
		field.String("author_id"),
	}
}

// Edges of the Work.
func (Work) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("works").
			Required().
			Unique().
			Field("author_id"),
		edge.To("parts", Part.Type),
	}
}
func (Work) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
