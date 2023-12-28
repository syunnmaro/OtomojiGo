package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Block holds the schema definition for the Block entity.
type Block struct {
	ent.Schema
}

// Fields of the Block.
func (Block) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").DefaultFunc(func() string {
			return uuid.New().String()
		}),
		field.String("author_id"),
		field.Float("speed"),
		field.String("speaker"),
		field.Float("volume"),
		field.Int("pitch"),
		field.String("texts"),
		field.Int("duration"),
		field.String("part_id"),
	}
}

// Edges of the Block.
func (Block) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("part", Part.Type).
			Ref("blocks").
			Required().
			Unique().
			Field("part_id"),
	}
}
func (Block) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
