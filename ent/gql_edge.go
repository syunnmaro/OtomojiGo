// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"

	"github.com/99designs/gqlgen/graphql"
)

func (b *Block) Part(ctx context.Context) (*Part, error) {
	result, err := b.Edges.PartOrErr()
	if IsNotLoaded(err) {
		result, err = b.QueryPart().Only(ctx)
	}
	return result, err
}

func (pa *Part) Work(ctx context.Context) (*Work, error) {
	result, err := pa.Edges.WorkOrErr()
	if IsNotLoaded(err) {
		result, err = pa.QueryWork().Only(ctx)
	}
	return result, err
}

func (pa *Part) Blocks(ctx context.Context) (result []*Block, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = pa.NamedBlocks(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = pa.Edges.BlocksOrErr()
	}
	if IsNotLoaded(err) {
		result, err = pa.QueryBlocks().All(ctx)
	}
	return result, err
}

func (u *User) Works(ctx context.Context) (result []*Work, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = u.NamedWorks(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = u.Edges.WorksOrErr()
	}
	if IsNotLoaded(err) {
		result, err = u.QueryWorks().All(ctx)
	}
	return result, err
}

func (w *Work) Author(ctx context.Context) (*User, error) {
	result, err := w.Edges.AuthorOrErr()
	if IsNotLoaded(err) {
		result, err = w.QueryAuthor().Only(ctx)
	}
	return result, err
}

func (w *Work) Parts(ctx context.Context) (result []*Part, err error) {
	if fc := graphql.GetFieldContext(ctx); fc != nil && fc.Field.Alias != "" {
		result, err = w.NamedParts(graphql.GetFieldContext(ctx).Field.Alias)
	} else {
		result, err = w.Edges.PartsOrErr()
	}
	if IsNotLoaded(err) {
		result, err = w.QueryParts().All(ctx)
	}
	return result, err
}