package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Work holds the schema definition for the Work entity.
type Work struct {
	ent.Schema
}

// Fields of the Work.
func (Work) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").Unique(),
		field.String("name"),
		field.Time("created_at"),
		field.String("author_id").Unique(),
	}
}

// Edges of the Work.
func (Work) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("author", User.Type).
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
