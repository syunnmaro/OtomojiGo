// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"graphql-test-api/ent/block"
	"graphql-test-api/ent/part"
	"graphql-test-api/ent/work"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// PartCreate is the builder for creating a Part entity.
type PartCreate struct {
	config
	mutation *PartMutation
	hooks    []Hook
}

// SetName sets the "name" field.
func (pc *PartCreate) SetName(s string) *PartCreate {
	pc.mutation.SetName(s)
	return pc
}

// SetWorkID sets the "work_id" field.
func (pc *PartCreate) SetWorkID(s string) *PartCreate {
	pc.mutation.SetWorkID(s)
	return pc
}

// SetAuthorID sets the "author_id" field.
func (pc *PartCreate) SetAuthorID(s string) *PartCreate {
	pc.mutation.SetAuthorID(s)
	return pc
}

// SetID sets the "id" field.
func (pc *PartCreate) SetID(s string) *PartCreate {
	pc.mutation.SetID(s)
	return pc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (pc *PartCreate) SetNillableID(s *string) *PartCreate {
	if s != nil {
		pc.SetID(*s)
	}
	return pc
}

// SetWork sets the "work" edge to the Work entity.
func (pc *PartCreate) SetWork(w *Work) *PartCreate {
	return pc.SetWorkID(w.ID)
}

// AddBlockIDs adds the "blocks" edge to the Block entity by IDs.
func (pc *PartCreate) AddBlockIDs(ids ...string) *PartCreate {
	pc.mutation.AddBlockIDs(ids...)
	return pc
}

// AddBlocks adds the "blocks" edges to the Block entity.
func (pc *PartCreate) AddBlocks(b ...*Block) *PartCreate {
	ids := make([]string, len(b))
	for i := range b {
		ids[i] = b[i].ID
	}
	return pc.AddBlockIDs(ids...)
}

// Mutation returns the PartMutation object of the builder.
func (pc *PartCreate) Mutation() *PartMutation {
	return pc.mutation
}

// Save creates the Part in the database.
func (pc *PartCreate) Save(ctx context.Context) (*Part, error) {
	pc.defaults()
	return withHooks(ctx, pc.sqlSave, pc.mutation, pc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (pc *PartCreate) SaveX(ctx context.Context) *Part {
	v, err := pc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (pc *PartCreate) Exec(ctx context.Context) error {
	_, err := pc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pc *PartCreate) ExecX(ctx context.Context) {
	if err := pc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (pc *PartCreate) defaults() {
	if _, ok := pc.mutation.ID(); !ok {
		v := part.DefaultID()
		pc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (pc *PartCreate) check() error {
	if _, ok := pc.mutation.Name(); !ok {
		return &ValidationError{Name: "name", err: errors.New(`ent: missing required field "Part.name"`)}
	}
	if _, ok := pc.mutation.WorkID(); !ok {
		return &ValidationError{Name: "work_id", err: errors.New(`ent: missing required field "Part.work_id"`)}
	}
	if _, ok := pc.mutation.AuthorID(); !ok {
		return &ValidationError{Name: "author_id", err: errors.New(`ent: missing required field "Part.author_id"`)}
	}
	if _, ok := pc.mutation.WorkID(); !ok {
		return &ValidationError{Name: "work", err: errors.New(`ent: missing required edge "Part.work"`)}
	}
	return nil
}

func (pc *PartCreate) sqlSave(ctx context.Context) (*Part, error) {
	if err := pc.check(); err != nil {
		return nil, err
	}
	_node, _spec := pc.createSpec()
	if err := sqlgraph.CreateNode(ctx, pc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(string); ok {
			_node.ID = id
		} else {
			return nil, fmt.Errorf("unexpected Part.ID type: %T", _spec.ID.Value)
		}
	}
	pc.mutation.id = &_node.ID
	pc.mutation.done = true
	return _node, nil
}

func (pc *PartCreate) createSpec() (*Part, *sqlgraph.CreateSpec) {
	var (
		_node = &Part{config: pc.config}
		_spec = sqlgraph.NewCreateSpec(part.Table, sqlgraph.NewFieldSpec(part.FieldID, field.TypeString))
	)
	if id, ok := pc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = id
	}
	if value, ok := pc.mutation.Name(); ok {
		_spec.SetField(part.FieldName, field.TypeString, value)
		_node.Name = value
	}
	if value, ok := pc.mutation.AuthorID(); ok {
		_spec.SetField(part.FieldAuthorID, field.TypeString, value)
		_node.AuthorID = value
	}
	if nodes := pc.mutation.WorkIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   part.WorkTable,
			Columns: []string{part.WorkColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(work.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.WorkID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := pc.mutation.BlocksIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   part.BlocksTable,
			Columns: []string{part.BlocksColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(block.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// PartCreateBulk is the builder for creating many Part entities in bulk.
type PartCreateBulk struct {
	config
	err      error
	builders []*PartCreate
}

// Save creates the Part entities in the database.
func (pcb *PartCreateBulk) Save(ctx context.Context) ([]*Part, error) {
	if pcb.err != nil {
		return nil, pcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(pcb.builders))
	nodes := make([]*Part, len(pcb.builders))
	mutators := make([]Mutator, len(pcb.builders))
	for i := range pcb.builders {
		func(i int, root context.Context) {
			builder := pcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*PartMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, pcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, pcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, pcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (pcb *PartCreateBulk) SaveX(ctx context.Context) []*Part {
	v, err := pcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (pcb *PartCreateBulk) Exec(ctx context.Context) error {
	_, err := pcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (pcb *PartCreateBulk) ExecX(ctx context.Context) {
	if err := pcb.Exec(ctx); err != nil {
		panic(err)
	}
}
